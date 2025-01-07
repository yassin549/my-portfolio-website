<script lang="ts">
  import { onMount } from 'svelte';
  import type { wType } from '../types/wType';

  export let window: wType;

  let inputValue = '';
  let commandHistory: string[] = [];
  let currentOutput = '';

  const commands = {
    help: () => `Available commands:
  help     - Show this help message
  clear    - Clear the terminal
  about    - About me
  contact  - Contact information
  projects - View my projects
  skills   - List my skills`,
    clear: () => '',
    about: () => `Hi, I'm Yassin!
A passionate full-stack developer from Morocco.
I love building web applications and exploring new technologies.`,
    contact: () => `Email: yassin.elkadaoui@gmail.com
GitHub: https://github.com/yassin549
LinkedIn: https://linkedin.com/in/yassin-elkadaoui`,
    projects: () => `My Projects:
1. Portfolio Website - A macOS-themed portfolio built with SvelteKit
2. E-commerce Platform - Full-stack application with Next.js and Node.js
3. Chat Application - Real-time chat app using Socket.io
4. Weather App - React-based weather application`,
    skills: () => `Technical Skills:
• Frontend: HTML, CSS, JavaScript, React, Svelte, Vue
• Backend: Node.js, Express, Python, Django
• Database: MongoDB, PostgreSQL, MySQL
• Tools: Git, Docker, AWS, Figma`
  };

  function handleCommand(input: string) {
    const trimmedInput = input.trim().toLowerCase();
    const command = commands[trimmedInput as keyof typeof commands];
    
    if (command) {
      currentOutput = command();
    } else if (trimmedInput === '') {
      currentOutput = '';
    } else {
      currentOutput = `Command not found: ${trimmedInput}. Type 'help' for available commands.`;
    }

    commandHistory = [...commandHistory, `$ ${input}`, currentOutput];
    inputValue = '';
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleCommand(inputValue);
    }
  }
</script>

<div class="flex flex-col h-full bg-gray-900 text-gray-100 font-mono p-4">
  <div class="flex-1 overflow-y-auto whitespace-pre-wrap mb-4">
    {#each commandHistory as line}
      <div>{line}</div>
    {/each}
  </div>

  <div class="flex items-center">
    <span class="mr-2">$</span>
    <input
      type="text"
      bind:value={inputValue}
      on:keydown={handleKeydown}
      class="flex-1 bg-transparent outline-none"
      placeholder="Type 'help' for available commands"
    />
  </div>
</div>

<style>
  input {
    caret-color: white;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  :global(*) {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }

  :global(*::-webkit-scrollbar) {
    width: 8px;
  }

  :global(*::-webkit-scrollbar-track) {
    background: transparent;
  }

  :global(*::-webkit-scrollbar-thumb) {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
</style>
