# Dharani UI

React + Vite + TypeScript front end for the Dharani Spring Boot API.

## Start
    npm install
    npm run dev:mock     # sample data, no backend needed -> http://localhost:5173
    npm run dev          # real backend: run Spring Boot on :8080 first; /api is proxied
    npm run build        # production build in dist/

## Structure (what goes where)
    src/
      main.tsx                   entry point
      app/                       App shell: AppProviders, App, routes.tsx (the only list of pages)
      styles/                    GLOBAL styles. Change here, the whole app changes
        tokens.css                 colours, radius, shadows, page width
        typography.css             fonts, text sizes, weights, line heights
        base.css                   reset, body, focus ring
      components/
        ui/                      REUSABLE building blocks, no business logic
                                   Button, Field, SelectField, SearchSelect, MultiSelect,
                                   RadioGroup, Panel, FormRow, ActionBar, ModuleGrid
        common/                  COMMON app-wide pieces used on every page
                                   MainHeader, PageHeader, PageContainer, ResultPanel, ErrorBanner
        forms/                   shared composite forms: LocationSelect, SurveyKhataForm
      features/                  ONE FOLDER PER FEATURE (page + the parts only it uses)
        dashboard/  information/  land-search/  ror1b/  market-value/
      services/                  API layer: http.ts, masterData.ts, landRecords.ts, ror1b.ts, mock.ts
      config/                    modules.ts (tiles), districts.ts, env.ts
      types/  utils/  hooks/     shared types, helper functions, shared hooks

Every component is a folder:

    Button/
      Button.tsx            markup + logic
      Button.module.css     its own styles (scoped, cannot leak into other components)
      index.ts              export { default } from './Button'

Import with the `@/` alias (it means `src/`):  `import { Button, Panel } from '@/components/ui';`

## Rules
1. Colours, fonts and sizes come from `styles/tokens.css` and `styles/typography.css`. Never hard-code them in a component.
2. A component's CSS lives in its own `.module.css`. Do not add component styles to global files.
3. `ui/` components know nothing about land records. `features/` may use `ui/`, `common/`, `forms/` and `services/`.
4. Pages never call `fetch`. They call `api.something()` from `services/`.
5. Used by one feature only -> keep it in that feature (`features/<name>/components/`). Needed by two or more -> move it to `components/`.

## Common changes
- Change fonts / text sizes everywhere: `src/styles/typography.css`
- Change brand colour: `--color-primary` in `src/styles/tokens.css`
- Change the look of every form field: `components/ui/Field/Field.module.css`
- Change a dashboard tile: `src/config/modules.ts`
- Change an endpoint or its mock data: `src/services/`

## Add a new page (example: Mutation Orders)
1. `src/features/mutation-orders/MutationOrdersPage.tsx` (+ `.module.css` if needed, + `index.ts`). Copy `features/market-value` as a starting point.
2. API call: add a file in `src/services/` and add it to `services/index.ts`.
3. Route: one line in `src/app/routes.tsx`.
4. Tile: set `to: '/info/mutation-orders'` on its entry in `src/config/modules.ts`.

## Backend endpoints used
    Dropdowns   GET  /api/bhu_bharati/mandal/json?districtId=
                GET  /api/bhu_bharati/village/json?mandalId=
                GET  /api/bhu_bharati/surveyNo/json?villageId=
                GET  /api/bhu_bharati/khata-numbers/single?surveyNo=&villageId=
                GET  /api/bhu_bharati/survey_khataNo/json?villageId=   (slow, RoR1B khata list)
    Land Search POST /api/public-data/parsed {villageId, searchData(survey no), district, mandal, khataNoIdselect}
    RoR1B       GET  /api/ror1b/optimized-pdf/generate/pdf?districtId=&mandalId=&villageId=&khataNumbers=
Districts are a static list in `src/config/districts.ts` (the backend has no districts endpoint).

## Ship inside Spring Boot (one jar)
    npm run build
    # copy dist/* into <spring-project>/src/main/resources/static/
Routes use a hash (`/#/info/ror1b`), so Spring needs no extra routing config.
