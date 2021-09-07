const fg = require('fast-glob');
const fs = require('fs');
const convert = require('heic-convert');
const { promisify } = require('util');

const picMap = new Map();

async function toPng(original, target) {
  const isExist = fs.existsSync(target);
  if (isExist) return;
  const inputBuffer = await promisify(fs.readFile)(original);
  const outputBuffer = await convert({
    buffer: inputBuffer, // the HEIC file buffer
    format: 'PNG'        // output format
  });
  await promisify(fs.writeFile)(target, outputBuffer);
}

const cityMap = {
  macau: {
    name: '澳门',
    desc: '',
  }
};

async function init() {
  const allPic = await fg.sync(['pictures/**']);
  if (!fs.existsSync('imgs')) fs.mkdirSync('imgs');
  for await (const entry of allPic) {
    const city = entry.match(/^.+\/(.+)\//)?.[1];
    const target = entry.replace('pictures', 'imgs').replace('heic', 'png');

    if (!picMap.has(city)) {
      if (!fs.existsSync(`imgs/${city}`)) fs.mkdirSync(`imgs/${city}`);
      toPng(entry, target);
      picMap.set(city, [target]);
    } else {
      const data = picMap.get(city);
      data.push(target);
      toPng(entry, target);
      picMap.set(city, data);
    }
  }

  const list = [];
  for (let [key, value] of picMap) {
    list.push({
      ...cityMap[key],
      type: key,
      data: value,
    });
  }
  fs.writeFileSync('data/travel.json', JSON.stringify(list, null, 2), { encoding: 'utf-8' });
}

init()
  .catch(function (e) {
    console.error(e)
  })