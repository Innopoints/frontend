<template>
  <nav class="flex items-center justify-between flex-wrap bg-blue-700 p-3">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <NuxtLink to="/" class="text-white font-bold py-1 pl-3 rounded no-underline hover:text-gray-200">
        <span class="hidden sm:inline text-2xl">
          Innopoints
        </span>
        <span class="inline sm:hidden text-2xl">
          IP
        </span>
      </NuxtLink>
    </div>
    <div class="flex w-auto items-center flex-grow">
      <div class="text-sm flex-grow">
        <NuxtLink to="/about" class="text-white py-2 pl-3 no-underline text-lg hover:text-gray-200">
          About
        </NuxtLink>
      </div>
      <div>
        <a href="https://github.com/vanishmax/innopoints-frontend" class="btn bg-white text-black font-bold py-2 px-4 rounded no-underline hover:bg-gray-200" target="_blank">GitHub</a>
      </div>
    </div>
  </nav>
</template>
