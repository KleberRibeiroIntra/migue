import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

/**
 * Botão "de apertar" (solid e outline): borda grossa e sombra sólida embaixo, sobe no hover e afunda no clique.
 * Usa o colorPalette do botão, então laranja, vermelho, verde etc. ganham o mesmo efeito na cor de cada um.
 * ghost fica de fora: menu lateral, ícones da tabela e o X dos dialogs ficariam pesados com borda e sombra.
 */
const press = {
  transitionProperty: 'transform, box-shadow, border-color, background',
  transitionDuration: '90ms',
  _hover: { transform: 'translateY(-2px)' },
  _active: { transform: 'translateY(3px)' },
  _disabled: { transform: 'none' },
}

const config = defineConfig({
  theme: {
    recipes: {
      button: {
        base: {
          fontWeight: '700',
          _focusVisible: { outline: '3px solid', outlineColor: 'colorPalette.300', outlineOffset: '2px' },
        },
        variants: {
          variant: {
            solid: {
              ...press,
              borderWidth: '2px',
              borderColor: 'colorPalette.700',
              boxShadow: '0 4px 0 {colors.colorPalette.700}',
              _hover: { ...press._hover, boxShadow: '0 6px 0 {colors.colorPalette.700}' },
              _active: { ...press._active, boxShadow: '0 1px 0 {colors.colorPalette.700}' },
              _disabled: { ...press._disabled, boxShadow: '0 4px 0 {colors.colorPalette.700}' },
            },
            outline: {
              ...press,
              bg: 'white',
              borderWidth: '2px',
              borderColor: 'blackAlpha.200',
              boxShadow: '0 4px 0 {colors.blackAlpha.200}',
              _hover: {
                ...press._hover,
                bg: 'colorPalette.50',
                borderColor: 'colorPalette.500',
                boxShadow: '0 6px 0 {colors.colorPalette.500}',
              },
              _active: { ...press._active, boxShadow: '0 1px 0 {colors.colorPalette.500}' },
              _disabled: { ...press._disabled, boxShadow: '0 4px 0 {colors.blackAlpha.200}' },
            },
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
