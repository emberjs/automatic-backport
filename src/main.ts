import * as core from '@actions/core'
import Mapping from './mapping'

function required(key: string): string {
  return core.getInput(key, {required: true})
}

function optional(key: string, fallback = ''): string {
  return core.getInput(key) || fallback
}

async function run(): Promise<void> {
  try {
    const before = required('before')
    core.debug(`before: ${before}`)
    core.setOutput('before', before)

    const after = required('after')
    core.debug(`after: ${after}`)
    core.setOutput('after', after)

    const tags = Mapping.fromYAML(optional('tags', '{}'))
    core.debug(`tags: ${JSON.stringify(tags, null, 2)}`)
    core.setOutput('tags', tags)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
