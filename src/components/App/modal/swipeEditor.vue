<template>
  <ModalSection
    class="w-full h-40 relative overflow-hidden">
    <div
      class="absolute h-full bg-gray-500/5 top-0 left-0"
      :style="{width: `${percent}%`}"/>
    <div class="w-full h-full grid place-content-center pointer-events-none">
      <div class="flex flex-row gap-4 items-center text-gray-400">
        <i class="text-lg bi bi-chevron-compact-left"/>
        <p>左右にスワイプして<br>現在のページを変更</p>
        <i class="text-lg bi bi-chevron-compact-right"/>
      </div>
    </div>
    <div
      class="absolute w-full h-full left-0 top-0 right-0 bg-transparent"
      @touchmove="(event) => moveChangeNowScope(event)"
      @touchend="endChangeNowScope()"/>
  </ModalSection>
</template>
<script setup lang="ts">
import { computed, ref } from "vue"
import ModalSection from "./section.vue"

const props = defineProps<{
  value: number
  min: number
  max: number
}>()

const emit = defineEmits<{
  (e: "update:value", newValue: number): void
}>()

const firstTouchX = ref(0)
const firstTouchNowScope = ref(0)
const firstTouch = ref(true)

const percent = computed(() => {
  return ( props.value - props.min ) / ( props.max - props.min ) * 100
})

function moveChangeNowScope(touchEvent: TouchEvent){
	touchEvent.preventDefault()
	const touch = touchEvent.touches.item(0)
	if(touch){
		const touchClientX = touch.clientX

		if(firstTouch.value){
			firstTouchX.value = touchClientX
			firstTouchNowScope.value = props.value
			firstTouch.value = false
		}else{
			const newScope = Math.floor((touchClientX - firstTouchX.value) / 10) + firstTouchNowScope.value
			
			if(newScope < props.min){
				emit("update:value", props.min)
			}else if(newScope > props.max){
				emit("update:value", props.max)
			}else{
				emit("update:value", newScope)
			}
		}
	}
}

function endChangeNowScope(){ firstTouch.value = true }
</script>