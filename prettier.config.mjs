/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

const prettierConfig = {
    arrowParens: 'avoid',
    bracketSameLine: false,
    bracketSpacing: true,
    htmlWhitespaceSensitivity: 'css',
    insertPragma: false,
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'all',
    proseWrap: 'always',
    quoteProps: 'as-needed',
    requirePragma: false,
    importOrder: [
        '^(next/(.*)$)|^(next$)',
        '^(react/(.*)$)|^(react$)',
        '^(lucide-react$)',
        '<TYPES>^(node:)',
        '<TYPES>',
        '<TYPES>^[.]',
        '<BUILTIN_MODULES>',
        '<THIRD_PARTY_MODULES>',
        '^@/components/(.*)$',
        '^@/lib/(.*)$',
        '^@/providers/(.*)$',
        '^@/types/(.*)$',
        '^@/utils/(.*)$',
        '^@/(.*)$',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderCaseInsensitive: true,

    plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
    overrides: [
        {
            files: ['*.json', '*.yml'],
            options: {
                tabWidth: 4,
            },
        },
    ],
}

export default prettierConfig
