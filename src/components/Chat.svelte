<script>
    import Loader from "./Loader.svelte";
    let prompt="";
    let result = "";
    let load = false;
    let texto = false;
  
    export let token;
    const API_KEY = token;
    const OPENAI_URL = 'https://api.openai.com/v1/completions';
  
    const apiSubmit = async(text) => {
      
        if(text === "texto"){
        texto = true;
      }else{
        texto = false;
      }

      load = true;
      result = "";
      const body = {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.7, //aleatoriedad de la respuesta, cerca de 0.1 casi la misma respuesta
        model: "text-davinci-003"
      };
  
      const response = await fetch(OPENAI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(body),
      })
  
      const { choices } = await response.json();
      result = choices[0].text;
      if(result != ""){
        load = false;
        prompt = "";
      }
  
    };
    </script>
  
  <div class="mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <div class="px-4 py-5 sm:px-6">
      <h2 class="text-6xl font-medium text-gray-900">ChatBot GPT</h2>
    </div>
    <div class="border-t border-gray-200">
      <div class="px-4 py-5 sm:p-6">
        <div class="mb-4">
          <textarea
            bind:value={prompt}
            class="border-2 border-pink-500 rounded-md w-full py-2 px-3"
            rows="4"
            placeholder="Escribe tu descripción aquí"
          />
        </div>
        <div>
          <button
            class="px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none"
            on:click={() => apiSubmit("codigo")}
          >Quiero código</button>
          <button
            class="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-pink-600 focus:outline-none"
            on:click={() => apiSubmit("texto")}
          >Quiero texto</button>
        </div>
        {#if texto}
            <p>{result}</p>
        {/if}
        {#if !texto}
            <pre>{result}</pre>
        {/if}
        {#if load}
          <Loader />
        {/if}
      </div>
    </div>
  </div>
    