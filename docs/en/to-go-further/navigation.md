---
title: Navigation
description: Route management with React Router
nav: 2
id: 59aeed03e519ed28b06d1949871d5026
---

## Declaring pages / routes with React Router

Inside the **BrowserRouter** tag, a **Routes** tag is indicated. This contains a list of **Route** tags, associating each accessible route, via the **_path_** attribute, to each component to display, with the **_element_** attribute.

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<ProjectsPage />} />
    <Route path="/projects/:id" element={<ProjectPage />} />
  </Routes>
</BrowserRouter>
```

## Page presentation

This website is composed of 2 pages:

- "/" : Displays the **ProjectsPage**, corresponding to the site's home page where the list of projects is accessible

![Home page with projects](https://res.cloudinary.com/dwuvdquym/image/upload/v1756754067/codeur/docs/Home_Page_gxwbkv.png)

- "/projects/:id" : Displays the **ProjectPage** which allows access to information about a project, access to the offer submission form and access to existing offers

![Project page](https://res.cloudinary.com/dwuvdquym/image/upload/v1756754482/codeur/docs/Project_Page_wzflhc.png)

## Navigation between pages

<img src="https://res.cloudinary.com/dwuvdquym/image/upload/v1756756445/codeur/docs/codeur-clone-navigation-dark-en_gogxcx.svg" alt="How navigation works" class="hidden dark:block" />

<img src="https://res.cloudinary.com/dwuvdquym/image/upload/v1756756446/codeur/docs/codeur-clone-navigation-light-en_xskb7c.svg" alt="How navigation works" class="block dark:hidden" />
