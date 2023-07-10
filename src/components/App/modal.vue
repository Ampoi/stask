<template>
    <TransitionRoot appear :show="props.open" as="template">
		<Dialog class="fixed bottom-0 w-screen h-screen p-0 bg-transparent">
			<TransitionChild
				enter-from="opacity-0"
				enter="duration-300 ease-out"
				enter-to="opacity-100"
				leave-from="opacity-100"
				leave="duration-300 ease-in"
				leave-to="opacity-0">
				<div class="w-full h-full fixed bottom-0 bg-black/20" @click="turnOpen()"/>
			</TransitionChild>
			<div class="w-full h-5/6 fixed bottom-0">
				<TransitionChild
					enter-from="translate-y-full"
					enter="duration-300 ease-out"
					enter-to="translate-y-0"
					leave-from="translate-y-0"
					leave="duration-300 ease-out"
					leave-to="translate-y-full"
					class="bg-white p-6 pt-10 rounded-t-3xl h-full"
					as="div">
                    <slot></slot>
				</TransitionChild>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog } from "@headlessui/vue";
import { Switch } from "../../functions/switch";

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: "update:open", newOpen: boolean): void }>()

function turnOpen(){
    const newOpen = new Switch(props.open)
    newOpen.turn()

    emit("update:open", newOpen.value)
}
</script>