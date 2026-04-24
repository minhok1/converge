## React

- For frequent calculations, use useMemo to optimise the frontend code

## Structure

- Every major page of the application should be a part of the "pages" folder
- Break each page down to different components as well so that each section of the page isn't too long
- Move any component that is not specific to that page to a shared, generic component in "Shared" folder
- Components should be generic with inputs - ideally, each page is just a combination of its own components, and these components are just combinations of different shared components with configurations as inputs. Obviously this is too ideal, and there's bound to be some custom logic here and there. But a good rule of thumb is that these files should be kept to under 100-150 lines. MAYBE 200 if need be but try not to go over that
- Avoid having too many states. It's hard to say how many is too many because sometimes you just need a lot, but if we have 10+ states for a single component, that component may need to be broken down a lot so that each component does one thing really well
- States should only be for small logic related stuff for each component. For actual data or large states that govern the behaviour of the application, use redux
- For any logic that may get repeated, separate that into custom hooks
- Calls to endpoints should be written with React Query, and should be stored in different service files in the services folder
- There should be an apiClient.ts file that intercepts calls and fills it with auth token, headers, or anything else that the calls have to go through before making it to the API.

## Styling

- For readability, always use tailwind CSS for basic styling such as padding, margin, flex, etc. If tailwind class names get too complicated and long for complex styling (e.g. very complex animations), you may use custom .scss files
- Refer to Figma design and try to replicate the design when prompted to. Note that Figma code is often convoluted and hard to understand, so just refer to it to copy over the styles but not the entire code itself
- Keep colours and designs that continue to occur in the central DesignSystems
- Lucide-react icons should be the standard icons
- Responsive design should be implemented for largely 3 designs: mobile, tablet and web.

## User experience

- Irreversible actions need user confirmation modal instead of going ahead with the action
