import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

/**
 * Botão "de apertar" (solid e outline), discreto: uma borda sólida curta embaixo (a espessura do botão) mais uma
 * sombra difusa em camadas, que dá a sensação de ele estar saltando da tela. No hover sobe 1px e a sombra
 * espalha; no clique afunda e a sombra quase some. ghost fica de fora (menu, ícones da tabela, X dos dialogs).
 *
 * `edge` é a cor da borda de baixo; `glow` tinge a sombra difusa (neutra no outline, no tom do botão no solid).
 */
const press = (edge: string, glow: string) => {
  const soft = (alpha: number) => `color-mix(in srgb, ${glow} ${alpha}%, transparent)`
  return {
    boxShadow: `0 2px 0 ${edge}, 0 3px 6px ${soft(12)}, 0 8px 16px -4px ${soft(14)}`,
    transitionProperty: 'transform, box-shadow, border-color, background',
    transitionDuration: '120ms',
    _hover: {
      transform: 'translateY(-1px)',
      boxShadow: `0 3px 0 ${edge}, 0 6px 12px ${soft(14)}, 0 14px 24px -6px ${soft(18)}`,
    },
    _active: {
      transform: 'translateY(1px)',
      boxShadow: `0 1px 0 ${edge}, 0 1px 3px ${soft(12)}`,
    },
    _disabled: { transform: 'none', boxShadow: `0 2px 0 ${edge}` },
  }
}

const INK = 'rgb(36, 28, 21)'
const outlinePress = press('{colors.blackAlpha.200}', INK)

const config = defineConfig({
  theme: {
    recipes: {
      button: {
        base: {
          fontWeight: '600',
          _focusVisible: { outline: '2px solid', outlineColor: 'colorPalette.300', outlineOffset: '2px' },
        },
        variants: {
          variant: {
            solid: {
              ...press('color-mix(in srgb, {colors.colorPalette.700} 45%, transparent)', '{colors.colorPalette.700}'),
              borderWidth: '1px',
              borderColor: 'colorPalette.600',
            },
            outline: {
              ...outlinePress,
              bg: 'white',
              borderWidth: '1px',
              borderColor: 'blackAlpha.200',
              _hover: {
                ...outlinePress._hover,
                bg: 'colorPalette.50/60',
                borderColor: 'colorPalette.300',
              },
            },
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
