import type { ViteUserConfig } from 'astro'

import type { StarlightMultipleSidebarDropdownConfig, StarlightMultipleSidebarDropdownSharedConfig } from './config'

const moduleId = 'virtual:starlight-multiple-sidebar-dropdown/config'

export function vitePluginStarlightMultipleSidebarDropdown(config: StarlightMultipleSidebarDropdownConfig): VitePlugin {
  const resolvedModuleId = `\0${moduleId}`

  const sharedConfig: StarlightMultipleSidebarDropdownSharedConfig = config.map((topic) => {
    if (!('items' in topic)) return { ...topic, type: 'link' }
    const { items, ...topicWithoutItems } = topic
    return { ...topicWithoutItems, type: 'group' }
  })

  const moduleContent = `export default ${JSON.stringify(sharedConfig)}`

  return {
    name: 'vite-plugin-starlight-multiple-sidebar-dropdown',
    load(id) {
      return id === resolvedModuleId ? moduleContent : undefined
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : undefined
    },
  }
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number]
