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
    deps: {
      alwaysBundle: /./,
      onlyBundle: false,
    },
    hooks: {
      'build:done': async (context) => {
        await mkdir(outDir, { recursive: true })
        const distFile = path.resolve(
          context.options.outDir,
          context.chunks.find((c) => !c.fileName.includes('.d'))!.fileName,
        )

        const { exitCode } = await x(
          process.execPath,
          [cli, 'native', distFile, 'build/app'],
          {
            nodeOptions: { stdio: 'inherit' },
          },
        )
        if (exitCode !== 0) {
          throw new Error(`Failed to execute porffor: exit code ${exitCode}`)
        }
      },
    },
  },
)
