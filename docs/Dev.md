# Dev Notes

-   Upgrade JS Packages

    -   `yarn upgrade --latest next`

-   Test at http://localhost:3001/

-   Add `className="DEBUG_LAYOUT"` to any HTML element to draw a red border around it (for visual debugging).

# localStorage

I use [store2](https://github.com/nbubna/store) instead of localStorage. It seems silly for one-liners like `localStorage.getItem(keyName)`.... but oh well. The store2 library's `.get()` automatically parses numbers and JSON, and allows namespacing and other supposedly nice features. Maybe if it is useless, I can eventually revert to localStorage.
