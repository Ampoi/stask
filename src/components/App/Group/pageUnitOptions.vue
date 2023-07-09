<template>
  <Listbox
    :model-value="props.pageUnit"
    @update:model-value="value => updateCardUnit(value)"
    v-slot="{ open }">
      <ListboxButton
          class="rounded-lg p-2 bg-white w-full"
          :class="{ 'rounded-b-none': open }">
          単位：{{ props.pageUnit.name }}
      </ListboxButton>
      <TransitionRoot
          enter-from="opacity-0 ease-out -translate-y-10"
          enter="duration-300"
          enter-to="opacity-100 translate-y-0"
          leave-from="opacity-100 translate-y-0"
          leave-to="opacity-0 ease-in -translate-y-10"
          leave="duration-300"
          class="relative w-full">
          <ListboxOptions
              class="p-2 w-full bg-white rounded-b-lg border-t-2 border-gray-100 flex flex-col absolute"
              ref="unitsOptions">
              <ListboxOption
                  v-for="(unit, index) in units"
                  :key="index"
                  :value="unit"
                  class="p-1 text-center">
                  {{ unit.name }}
              </ListboxOption>
          </ListboxOptions>
      </TransitionRoot>
  </Listbox>
</template>
<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, TransitionRoot } from "@headlessui/vue"

type Unit = {
  name: string
  symbol: (page: number) => string
}

const props = defineProps<{
  pageUnit: Unit
}>()

const emit = defineEmits<{
  (e: "update:pageUnit", newPageUnit: Unit): void
}>()

const units: Unit[] = [
    { name: "ページ", symbol: (page: number): string => {return `p.${page}`} },
    { name: "問題(四角)", symbol: (page: number): string => {return `[${page}]`} },
]

function updateCardUnit(newPageUnit: Unit){ 
  emit("update:pageUnit", newPageUnit)
}
</script>