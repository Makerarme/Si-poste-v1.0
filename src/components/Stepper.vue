<template>
  <div class="flex items-center justify-center space-x-4">
    <!-- Step 1 -->
    <div class="flex items-center space-x-2">
      <div
          class="w-8 h-8 flex items-center justify-center rounded-full text-white"
          :class="currentStep >= 1 ? 'bg-pink-600' : 'bg-gray-500'"
      >
        <span>1</span>
      </div>
      <span
          :class="currentStep >= 1 ? 'text-pink-600 font-semibold' : 'text-gray-500'"
          class="text-sm"
      >
        Info Générale
      </span>
    </div>

    <!-- Line -->
    <div class="w-8 h-px" :class="currentStep >= 2 ? 'bg-pink-600' : 'bg-gray-500'"></div>

    <!-- Step 2 -->
    <div class="flex items-center space-x-2">
      <div
          class="w-8 h-8 flex items-center justify-center rounded-full text-white"
          :class="currentStep >= 2 ? 'bg-pink-600' : 'bg-gray-400'"
      >
        <span>2</span>
      </div>
      <span
          :class="currentStep >= 2 ? 'text-pink-600 font-semibold' : 'text-gray-500'"
          class="text-sm"
      >
        Info Matériel
      </span>
    </div>

    <!-- Line -->
    <div class="w-8 h-px" :class="currentStep >= 3 ? 'bg-pink-600' : 'bg-gray-500'"></div>

    <!-- Step 3 -->
    <div class="flex items-center space-x-2">
      <div
          class="w-8 h-8 flex items-center justify-center rounded-full text-white"
          :class="currentStep >= 3 ? 'bg-pink-600' : 'bg-gray-400'"
      >
        <span>3</span>
      </div>
      <span
          :class="currentStep >= 3 ? 'text-pink-600 font-semibold' : 'text-gray-500'"
          class="text-sm"
      >
        Confirmation
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stepper",
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
  },
};
</script>
