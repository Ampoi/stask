<template>
    <Listbox
        v-model="editableCardSubject"
        v-slot="{ open }"
        as="div"
        class="grow">
        <ListboxButton
            class="rounded-lg p-2 border-[1px] border-gray-100 w-full"
            :class="{ 'rounded-b-none': open }">
            教科：{{ props.cardSubject.name }}
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
                class="p-2 w-full bg-white rounded-b-lg border-[1px] border-t-0 border-gray-100 flex flex-col absolute"
                ref="unitsOptions">
                <ListboxOption
                    v-for="(subject, index) in props.subjects"
                    :key="index"
                    :value="subject"
                    class="p-1 text-center">
                    {{ subject.name }}
                </ListboxOption>
            </ListboxOptions>
        </TransitionRoot>
    </Listbox>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, TransitionRoot } from "@headlessui/vue"
import { Subject } from "../../../../models/task";

const props = defineProps<{
    subjects: Subject[],
    cardSubject: Subject
}>()

const emit = defineEmits<{
    (e: "update:cardSubject", newCardSubject: Subject): void
}>()

const editableCardSubject = computed({
    get(){
        return props.cardSubject
    },
    set(newCardSubject: Subject){
        emit("update:cardSubject", newCardSubject)
    }
})
</script>