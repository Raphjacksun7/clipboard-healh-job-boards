<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">Health Explore</h1>

  <p align="center">
    A home asignment by Clipboard Health
    <br />
    <a href="https://health-explore-mu.vercel.app/">View Demo</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Product Name Screen Shot](https://i.imgur.com/aPgiyqR.png)

### Built With

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node 14.15.1 or superior, using nvm:
  ```sh
  nvm install install 14.15.1
  ```
- A modern version of `npm` or `yarn`. This README assumes you have `npm`, but commands are almost always the same.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nonameable/cbh-home-test.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Run

1. Run in development mode
   ```sh
   npm run dev
   ```
2. Run in development mode in inspect mode
   ```sh
   npm run dev-inspect
   ```

### Build for production

```sh
   npm run build
```

### Test

The tests are written in JEST

```sh
   npm run test
```

<!-- USAGE EXAMPLES -->

## Usage

This application allows health professionals look for a job that matches their needs and skills. A user can:

1. **Filter** by specific departments, job types , experience required and schedule.
2. **Search for specific text** associated with a job e.g. 'Orthopedic' or 'Mammoth Hospital'
3. **Sort the jobs by a particular filter**. If the user chooses a 'Location' sorting option, the hospitals are ordered by the state they are located in. Any other sorting option orders the job within those hospitals.

Jobs are rendered in an accordeon manner. A hospital contains jobs and if you click in a job you can see extended info on that job.

_The best way to learn how to use it is to interact with a live demo [HERE](https://health-explore-mu.vercel.app/)_

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

David Mauricio Delgado Ruiz - [@damaderu](https://twitter.com/damaderu)

Project Link: [https://github.com/nonameable/cbh-home-test](https://github.com/nonameable/cbh-home-test)
