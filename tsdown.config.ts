import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { x } from 'tinyexec'
import { lib } from 'tsdown-preset-sxzz'

export default lib(
  {},
  {
    hooks: {
      'build:done': async (context) => {
        const cli = path.resolve(
          fileURLToPath(import.meta.resolve('porffor/package.json')),
          '../runtime/index.js',
        )
        const outDir = path.resolve(process.cwd(), 'build')
        await mkdir(outDir, { recursive: true })
        await x(
          process.execPath,
          [
            cli,
            'native',
            path.resolve(
              context.options.outDir,
              context.chunks.find((c) => !c.fileName.includes('.d'))!.fileName,
            ),
            'build/app',
          ],
          {
            nodeOptions: {
              stdio: 'inherit',
            },
          },
        )
      },
    },
  },
)
