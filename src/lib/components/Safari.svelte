<script lang="ts">
  import type { wType } from "../types/wType";
  import { closeWindow, toggleMinimize, toggleMaximize } from "../stores/windowStore";

  export let window: wType;
  export let startDrag: (e: MouseEvent, id: string, action: 'move' | 'resize') => void;

  const links = [
    {
      title: "Portfolio",
      url: "https://github.com/yassin549",
      description: "Check out my GitHub profile for more projects and contributions."
    },
    {
      title: "Social Media App",
      url: "https://github.com/yassin549/Django-socialmedia-app",
      description: "A feature-rich social networking platform built with Django."
    },
    {
      title: "News Application",
      url: "https://github.com/yassin549/django-news-app",
      description: "Dynamic news aggregation platform with real-time updates."
    },
    {
      title: "Brain Tumor Detection",
      url: "https://github.com/yassin549/Brain-Tumor-Detection-master",
      description: "AI-powered system for accurate brain tumor detection."
    },
    {
      title: "DietGPT App",
      url: "https://github.com/yassin549/dietgpt-app-main",
      description: "Intelligent diet planning application powered by GPT."
    }
  ];

  function openLink(url: string) {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  }
</script>

<div class="h-full flex flex-col bg-white">
  <!-- Title Bar -->
  <div
    class="h-8 bg-gray-200 flex items-center justify-between px-2"
    on:mousedown={(e) => startDrag(e, window.id, "move")}
  >
    <div class="flex items-center space-x-2">
      <button
        class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
        on:click={() => closeWindow(window.id)}
      ></button>
      <button
        class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
        on:click={() => toggleMinimize(window.id)}
      ></button>
      <button
        class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600"
        on:click={() => toggleMaximize(window.id)}
      ></button>
    </div>
    <div class="text-sm text-gray-600">Safari</div>
    <div class="w-16"></div>
  </div>

  <!-- Content -->
  <div class="flex-1 overflow-y-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Welcome to My Portfolio</h1>
    
    <div class="grid gap-6">
      {#each links as link}
        <div 
          class="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
          on:click={() => openLink(link.url)}
        >
          <h2 class="text-xl font-semibold text-blue-600 mb-2">{link.title}</h2>
          <p class="text-gray-600">{link.description}</p>
        </div>
      {/each}
    </div>
  </div>
</div>