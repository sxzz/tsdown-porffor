import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { x } from 'tinyexec'
import { lib } from 'tsdown-preset-sxzz'

const cli = path.resolve(
  fileURLToPath(import.meta.resolve('porffor/package.json')),
  '../runtime/index.js',
)
const outDir = path.resolve(process.cwd(), 'build')

export default lib(
  {},
  {
    hooks: {
      'build:done': async (context) => {
        await mkdir(outDir, { recursive: true })
        const distFile = path.resolve(
          context.options.outDir,
          context.chunks.find((c) => !c.fileName.includes('.d'))!.fileName,
        )

        await x(process.execPath, [cli, 'native', distFile, 'build/app'], {
          nodeOptions: { stdio: 'inherit' },
        })
      },
    },
  },
)
