<template>
    <Listbox
      :model-value="props.memberRole"
      @update:model-value="value => updateMemberRole(value)"
      as="div">
        <ListboxButton
            class="rounded-full py-1.5 bg-white w-full flex flex-row gap-2"
            :class="{
              'px-2.5': props.memberRole == 'member',
              'px-5': props.memberRole == 'admin'
            }">
            <i :class="`bi bi-${roles[props.memberRole].icon}`"/>
            <p>{{ roles[props.memberRole].name }}</p>
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
                class="p-2 w-32 bg-white rounded-lg border-2 border-gray-100 flex flex-col absolute mt-1"
                ref="unitsOptions">
                <ListboxOption
                    v-for="(role, key) in roles"
                    :key="key"
                    :value="key"
                    class="p-1 flex flex-row gap-2">
                    <i :class="`bi bi-${role.icon}`"/>
                    <p>{{ role.name }}</p>
                </ListboxOption>
            </ListboxOptions>
        </TransitionRoot>
    </Listbox>
</template>
<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, TransitionRoot } from "@headlessui/vue"
import { Role } from "../../../../models/groupSettings";

const props = defineProps<{
  memberRole: Role
}>() //TODO:Propsだけでv-modelみたいなことするのをやめたい

const emit = defineEmits<{
  (e: "update:memberRole", newMemberRole: Role): void
}>()

const roles: {
  [key in Role]: {
    name: "管理者" | "メンバー"
    icon: string
  }
} = {
  admin: {
    name: "管理者",
    icon: "person-fill"
  },
  member: {
    name: "メンバー",
    icon: "person"
  }
}

function updateMemberRole(newMemberRole: Role){
  emit("update:memberRole", newMemberRole)
}
</script>