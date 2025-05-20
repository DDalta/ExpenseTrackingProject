import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            initialColorMode: "light",
            useSystemColorMode: false,
        }
    }
})

