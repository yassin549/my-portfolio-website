<script>
  import { page } from '$app/stores';
</script>

<div class="error-container">
  <h1>{$page.status}: {$page.error?.message}</h1>
  <a href="/">Go back home</a>
</div>

<style>
  .error-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom right, #4f46e5, #7c3aed);
    color: white;
    text-align: center;
    padding: 2rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  a {
    color: white;
    text-decoration: underline;
    font-size: 1.125rem;
  }

  a:hover {
    text-decoration: none;
  }
</style>
