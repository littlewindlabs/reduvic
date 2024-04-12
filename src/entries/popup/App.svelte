<script lang="ts">
	import { createSwitch } from 'svelte-headlessui'
  import browser from 'webextension-polyfill'

	const sw = createSwitch({ label: 'Toggle image and video filtering' })

  browser.storage.local.get("enabled").then( (record) => {
    if (record) { 
      sw.set({checked: record['enabled']})
    }
    else {
      sw.set({checked: false})
    }
  })
</script>

<div class="py-16 inline-flex w-full flex-col items-center justify-center">
  <h1 class="my-2">Reduvic</h1>
	<button
		class="{$sw.checked ? 'bg-teal-700': 'bg-gray-900'} transition-colors transition duration-200 relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
		use:sw.toggle
    on:click = { function (){
      browser.storage.local.set({ "enabled": $sw.checked }).then( ()=> { console.log("enabled: " + $sw.checked) })
    }}
	>
	<span aria-hidden="true" class="{$sw.checked ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
	/>
	</button>
  <p> 
    {$sw.checked? "ON" : "OFF"}
  </p>
</div>