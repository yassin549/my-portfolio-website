<script lang="ts">
  import type { wType } from "../types/wType";
  import { bringToFront, closeWindow, toggleMinimize, toggleMaximize, updateWindowPosition, updateWindowSize } from "../stores/windowStore";
  import Terminal from "./Terminal.svelte";
  import Safari from "./Safari.svelte";
  import Photos from "./Photos.svelte";
  import Projects from "./Projects.svelte";
  import { fade, fly } from "svelte/transition";

  export let window: wType;

  let isDragging = false;
  let isResizing = false;
  let dragType: "move" | "resize" = "move";

  function startDrag(event: MouseEvent, type: "move" | "resize") {
    if (!window || window.isMaximized) return;
    
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = window.size?.width || 800;
    const startHeight = window.size?.height || 600;
    const startLeft = window.position?.x || 100;
    const startTop = window.position?.y || 100;

    if (type === "move") {
      isDragging = true;
    } else {
      isResizing = true;
    }
    dragType = type;

    function onMouseMove(e: MouseEvent) {
      if (type === "move" && isDragging) {
        const newX = Math.max(0, startLeft + e.clientX - startX);
        const newY = Math.max(0, startTop + e.clientY - startY);
        updateWindowPosition(window.id, newX, newY);
      } else if (type === "resize" && isResizing) {
        const newWidth = Math.max(400, startWidth + e.clientX - startX);
        const newHeight = Math.max(300, startHeight + e.clientY - startY);
        updateWindowSize(window.id, newWidth, newHeight);
      }
    }

    function onMouseUp() {
      isDragging = false;
      isResizing = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function handleWindowClick() {
    if (!window) return;
    bringToFront(window.id);
  }

  $: style = window ? `
    left: ${window.position?.x || 100}px;
    top: ${window.position?.y || 100}px;
    width: ${window.size?.width || 800}px;
    height: ${window.size?.height || 600}px;
    z-index: ${window.zIndex || 1};
  ` : '';
</script>

{#if window}
  <div
    class="window-container"
    class:hidden={window.isMinimized}
    class:maximized={window.isMaximized}
    {style}
    on:click={handleWindowClick}
    transition:fly={{ y: 20, duration: 200 }}
  >
    <!-- Window Header -->
    <div 
      class="window-header"
      on:mousedown={(e) => startDrag(e, "move")}
      on:dblclick={() => toggleMaximize(window.id)}
    >
      <div class="window-controls">
        <button 
          class="control close"
          on:click|stopPropagation={() => closeWindow(window.id)}
        ></button>
        <button 
          class="control minimize"
          on:click|stopPropagation={() => toggleMinimize(window.id)}
        ></button>
        <button 
          class="control maximize"
          on:click|stopPropagation={() => toggleMaximize(window.id)}
        ></button>
      </div>
      <div class="window-title">
        {window.type}
      </div>
    </div>

    <!-- Window Content -->
    <div class="window-content">
      {#if window.type === "terminal"}
        <Terminal {window} />
      {:else if window.type === "safari"}
        <Safari {window} />
      {:else if window.type === "photos"}
        <Photos {window} />
      {:else if window.type === "projects"}
        <Projects {window} />
      {/if}
    </div>
    
    {#if !window.isMaximized}
      <div
        class="resize-handle"
        on:mousedown={(e) => startDrag(e, "resize")}
      ></div>
    {/if}
  </div>
{/if}

<style lang="postcss">
  .window-container {
    @apply fixed rounded-xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-lg;
    @apply border border-white/20;
    transition: all 0.2s ease-out;
  }

  .window-header {
    @apply h-10 bg-transparent flex items-center justify-between px-3;
    @apply select-none cursor-default;
    -webkit-app-region: drag;
  }

  .window-controls {
    @apply flex items-center space-x-2 -ml-1;
    -webkit-app-region: no-drag;
  }

  .control {
    @apply w-3 h-3 rounded-full border-0;
    @apply transition-all duration-200;
    @apply hover:scale-110 focus:outline-none;
    @apply cursor-pointer;
  }

  .close {
    @apply bg-[#FF5F57] hover:bg-[#FF5F57]/90;
  }

  .minimize {
    @apply bg-[#FEBC2E] hover:bg-[#FEBC2E]/90;
  }

  .maximize {
    @apply bg-[#28C840] hover:bg-[#28C840]/90;
  }

  .window-title {
    @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
    @apply text-sm font-medium text-gray-600 capitalize opacity-50;
    -webkit-app-region: drag;
  }

  .window-content {
    @apply relative h-[calc(100%-2.5rem)] overflow-auto;
    @apply bg-white/40 backdrop-blur-md;
  }

  .resize-handle {
    @apply absolute bottom-0 right-0 w-4 h-4 cursor-se-resize;
  }

  .hidden {
    @apply opacity-0 pointer-events-none scale-95;
  }

  .maximized {
    @apply fixed inset-0 m-0 w-screen h-screen !important;
    @apply rounded-none border-0;
  }

  :global(.dark) .window-container {
    @apply bg-gray-900/80;
  }

  :global(.dark) .window-content {
    @apply bg-gray-900/40;
  }

  :global(.dark) .window-title {
    @apply text-gray-400;
  }
</style>