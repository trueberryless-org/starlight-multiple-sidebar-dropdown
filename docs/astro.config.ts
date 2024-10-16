// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightMultipleSidebarDropdown from 'starlight-multiple-sidebar-dropdown'

export default defineConfig({
  integrations: [
    starlight({
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/trueberryless-org/starlight-multiple-sidebar-dropdown/edit/main/docs/',
      },
      plugins: [
        starlightMultipleSidebarDropdown([
          {
            label: 'Documentation',
            link: '/docs/getting-started/',
            icon: 'open-book',
            items: [
              { label: 'Start Here', items: ['docs/getting-started', 'docs/configuration'] },
              { label: 'Resources', items: ['docs/resources/starlight'] },
            ],
          },
          {
            label: {
              en: 'Demo',
              fr: 'Démo',
            },
            link: '/demo/',
            icon: 'puzzle',
            items: [
              { label: 'API', autogenerate: { directory: 'demo/api' } },
              { label: 'Components', autogenerate: { directory: 'demo/components' } },
              { label: 'Commands', autogenerate: { directory: 'demo/commands' }, collapsed: true },
            ],
            badge: {
              text: {
                en: 'Stub',
                fr: 'Ébauche',
              },
              variant: 'caution',
            },
          },
          {
            label: 'Starlight Docs',
            link: 'https://starlight.astro.build/',
            icon: 'starlight',
          },
        ]),
      ],
      social: {
        github: 'https://github.com/trueberryless-org/starlight-multiple-sidebar-dropdown',
      },
      title: 'Starlight Multiple Sidebar Dropdown',
      locales:
        process.env['NODE_ENV'] === 'test'
          ? {
              root: { label: 'English', lang: 'en' },
              fr: { label: 'Français', lang: 'fr' },
            }
          : undefined,
    }),
  ],
  site: 'https://starlight-multiple-sidebar-dropdown.trueberryless.org',
})
