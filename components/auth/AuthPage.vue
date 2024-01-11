<template>
  <div class="flex h-screen">
    <div class="relative hidden flex-1 w-0 lg:block overflow-hidden">
      <img
        class="absolute object-cover w-100 "
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt="dgdgd"
      />
    </div>

    <div>
      <div
        class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
      >
        <div class="flex xs:ml-12 items-center w-full h-full max-w-sm mx-auto lg:w-96">
          <AuthForm/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
