/**
 * 从阿里云抓取各区域的 geojson
 */
import { constants } from 'fs'
import { access, mkdir, readdir, writeFile } from 'fs/promises'
import { createRequire } from 'module'
import fetch from 'node-fetch'
import { basename, dirname, extname, join } from 'path'
import { fileURLToPath } from 'url'

import { sleep } from './utils.mjs'

const _require = createRequire(import.meta.url)

/**
 * 获取 geo 路径
 * @param {*} relativePath 相对路径位置
 * @returns 拼接后的 geo 路径
 */
const getGeoPath = async (relativePath) => {
  const path = join(dirname(fileURLToPath(import.meta.url)), relativePath)

  // 确保路径存在，如果不存在就创建该路径，存在就啥也不做
  try {
    await access(path, constants.F_OK)
  } catch (err) {
    if (err.code === 'ENOENT') {
      // 目录不存在就创建该目录
      try {
        await mkdir(path, { recursive: true })
        console.log(`目录 ${path} 已创建`)
      } catch (err) {
        console.error(`目录 ${path} 创建失败`, err)
      }
    } else {
      console.error(`目录 ${path} 访问失败`, err)
    }
  }

  return path
}

/**
 * 获取需要抓取区域的 adcodes
 * @param {*} path geo 路径
 * @param {*} ignoreDistrict 是否忽略 district 等级的数据，默认忽略
 * @returns adcodes number 数组
 */
const getFetchedAdcodes = async (path, ignoreDistrict = true) => {
  let result = []

  try {
    const files = await readdir(path)
    // 去掉文件名的后缀
    const fileNamesWithoutExtension = files.map((file) =>
      basename(file, extname(file))
    )

    const chinaAreas = _require('../public/json/china-areas.json')

    result = chinaAreas
      .filter((item) => {
        const districtFlag = ignoreDistrict ? item.level !== 'district' : true
        return (
          !fileNamesWithoutExtension.includes(String(item.adcode)) &&
          districtFlag
        )
      })
      .map((item) => item.adcode)
  } catch (err) {
    console.error(`读取目录 ${path} 失败`, err)
  }

  return result
}

/**
 * 获取某个区域的 geo 数据
 * @param {*} path 数据保存的路径
 * @param {*} adcode 区域的 adcode
 */
const fetchAreaGeo = async (path, adcode) => {
  const fetchUrl = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`

  try {
    const res = await fetch(fetchUrl)

    if (res.ok) {
      const data = await res.json()
      const filepath = join(path, `${adcode}.json`)

      try {
        await writeFile(filepath, JSON.stringify(data))
        console.log(`文件 ${filepath} 已写入`)
      } catch (err) {
        console.error(`文件 ${filepath} 写入失败`, err)
      }
    } else {
      throw new Error(`${res.status}: ${res.statusText}`)
    }
  } catch (err) {
    console.error(`数据 ${fetchUrl} 获取失败`, err)
  }
}

const bootstrap = async () => {
  const path = await getGeoPath('../public/json/china')
  const adcodes = await getFetchedAdcodes(path)

  for (const adcode of adcodes) {
    await fetchAreaGeo(path, adcode)
    await sleep(300)
  }

  console.log('文件写入已完成！')
}

bootstrap()
