import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types'

import {
  StarlightMultipleSidebarDropdownConfigSchema,
  type StarlightMultipleSidebarDropdownUserConfig,
} from './libs/config'
import { overrideStarlightComponent, throwPluginError } from './libs/plugin'
import { vitePluginStarlightMultipleSidebarDropdown } from './libs/vite'

export type { StarlightMultipleSidebarDropdownConfig, StarlightMultipleSidebarDropdownUserConfig } from './libs/config'

export default function starlightMultipleSidebarDropdownPlugin(
  userConfig: StarlightMultipleSidebarDropdownUserConfig,
): StarlightPlugin {
  const parsedConfig = StarlightMultipleSidebarDropdownConfigSchema.safeParse(userConfig)

  if (!parsedConfig.success) {
    throwPluginError(
      `The provided plugin configuration is invalid.\n${parsedConfig.error.issues.map((issue) => issue.message).join('\n')}`,
    )
  }

  const config = parsedConfig.data

  return {
    name: 'starlight-multiple-sidebar-dropdown-plugin',
    hooks: {
      setup({ addIntegration, command, config: starlightConfig, logger, updateConfig }) {
        if (command !== 'dev' && command !== 'build') return

        if (starlightConfig.sidebar) {
          throwPluginError(
            'It looks like you have a `sidebar` configured in your Starlight configuration. To use `starlight-multiple-sidebar-dropdown`, create a new topic with your sidebar items.',
            'Learn more about topic configuration at https://starlight-multiple-sidebar-dropdown.netlify.app/docs/configuration/',
          )
        }

        const sidebar: StarlightUserConfig['sidebar'] = []

        for (const [index, topic] of config.entries()) {
          if ('items' in topic) {
            sidebar.push({ label: String(index), items: topic.items })
          }
        }
        updateConfig({
          components: {
            ...starlightConfig.components,
            ...overrideStarlightComponent(starlightConfig.components, logger, 'Sidebar'),
            ...overrideStarlightComponent(starlightConfig.components, logger, 'Pagination'),
          },
          sidebar,
        })

        addIntegration({
          name: 'starlight-multiple-sidebar-dropdown-integration',
          hooks: {
            'astro:config:setup': ({ updateConfig }) => {
              updateConfig({ vite: { plugins: [vitePluginStarlightMultipleSidebarDropdown(config)] } })
            },
          },
        })
      },
    },
  }
}
