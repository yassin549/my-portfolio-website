<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import SvelteMarkdown from 'svelte-markdown';
  import { projects } from '$lib/stores/projectStore';
  import type { ProjectData } from '$lib/types/projectType';

  let selectedProject: ProjectData | null = null;
  let readmeContent = '';
  let isLoading = false;

  async function selectProject(project: ProjectData) {
    selectedProject = project;
    isLoading = true;
    try {
      const response = await fetch(project.readmeUrl);
      readmeContent = await response.text();
    } catch (error) {
      console.error('Error loading README:', error);
      readmeContent = 'Error loading README content.';
    }
    isLoading = false;
  }

  onMount(() => {
    if ($projects && $projects.length > 0) {
      selectProject($projects[0]);
    }
  });

  const renderers = {
    image: (href, title, text) => {
      return `<img src="${href}" alt="${text}" class="max-w-full rounded-lg shadow-lg my-4" />`;
    }
  };
</script>

<div class="flex h-full bg-gray-900">
  <!-- Project List -->
  <div class="w-80 border-r border-white/10 overflow-y-auto bg-gray-900/80 backdrop-blur-xl">
    {#each $projects as project}
      <button
        class="w-full text-left p-4 hover:bg-white/10 transition-colors {selectedProject?.id === project.id ? 'bg-white/20' : ''}"
        on:click={() => selectProject(project)}
      >
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center">
            <img
              src="/icons/{project.icon}.svg"
              alt="{project.name} icon"
              class="w-8 h-8"
            />
          </div>
          <div>
            <h3 class="font-display text-white text-lg font-semibold">{project.name}</h3>
            <p class="text-white/70 text-sm mt-0.5">{project.shortDescription}</p>
          </div>
        </div>
      </button>
    {/each}
  </div>

  <!-- Project Details -->
  <div class="flex-1 overflow-y-auto p-8 bg-gray-900/90 backdrop-blur-xl">
    {#if selectedProject}
      <div class="max-w-3xl mx-auto">
        <div class="flex items-start justify-between mb-8">
          <div>
            <h1 class="font-display text-white text-3xl font-bold mb-2">
              {selectedProject.name}
            </h1>
            <p class="text-white/80 text-lg max-w-2xl">
              {selectedProject.shortDescription}
            </p>
          </div>
          <a
            href={selectedProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-white font-medium"
          >
            View on GitHub
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        <div class="space-y-8">
          <!-- Technologies -->
          <div>
            <h2 class="font-display text-white text-2xl font-semibold mb-4">Technologies</h2>
            <div class="flex flex-wrap gap-2">
              {#each selectedProject.technologies as tech}
                <span class="px-4 py-2 bg-white/10 rounded-lg text-white/90 font-medium">
                  {tech}
                </span>
              {/each}
            </div>
          </div>

          <!-- README Content -->
          {#if isLoading}
            <div class="flex items-center justify-center py-12">
              <div class="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white"></div>
            </div>
          {:else}
            <div class="prose-apple">
              <h2 class="font-display text-white text-2xl font-semibold mb-4">README</h2>
              <div class="bg-white/5 rounded-xl p-6 text-white/90">
                <SvelteMarkdown source={readmeContent} renderers={renderers} />
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="h-full flex items-center justify-center text-white/60 text-lg">
        Select a project to view details
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.prose-apple) {
    color: rgba(255, 255, 255, 0.9);
  }

  :global(.prose-apple h1) {
    @apply font-display text-white text-3xl font-bold mt-8 mb-4;
  }

  :global(.prose-apple h2) {
    @apply font-display text-white text-2xl font-semibold mt-6 mb-3;
  }

  :global(.prose-apple h3) {
    @apply font-display text-white text-xl font-semibold mt-5 mb-2;
  }

  :global(.prose-apple p) {
    @apply text-white/90 text-lg mb-4 leading-relaxed;
  }

  :global(.prose-apple ul) {
    @apply text-white/90 text-lg mb-4 list-disc pl-5 space-y-2;
  }

  :global(.prose-apple li) {
    @apply mb-2;
  }

  :global(.prose-apple code) {
    @apply text-sm bg-white/10 px-1.5 py-0.5 rounded font-mono text-white/90;
  }

  :global(.prose-apple pre) {
    @apply bg-black/20 p-4 rounded-lg mb-4 overflow-x-auto;
  }

  :global(.prose-apple pre code) {
    @apply bg-transparent p-0 text-white/90;
  }

  :global(.prose-apple a) {
    @apply text-blue-400 hover:text-blue-300 transition-colors;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    @apply w-2;
  }

  ::-webkit-scrollbar-track {
    @apply bg-black/10;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-white/10 rounded-full hover:bg-white/20 transition-colors;
  }
</style>
