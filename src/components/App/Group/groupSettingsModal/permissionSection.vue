<template>
    <ModalSection class="flex flex-col gap-4">
        <h3 class="text-2xl font-semibold">メンバーの権限</h3>
        <div class="flex flex-col gap-2">
            <PermissionItem
                title="カードを編集する"
                description="共有されているカードの名前やページなどを編集できるようにします"
                v-model:isAllowed="editablePermissions.member.card"/>
            <PermissionItem
                title="メンバーを管理する"
                description="グループ内のメンバーのロールを管理したりメンバーをグループからキックできるようにします"
                v-model:isAllowed="editablePermissions.member.members"/>
            <PermissionItem
                title="設定 / グループ名を変更する"
                description="グループのメンバー全体に表示されるグループ名を編集できるようにします"
                v-model:isAllowed="editablePermissions.member.settings.name"/>
            <PermissionItem
                title="設定 / グループの注意書きを変更する"
                description="グループのメンバー全体に表示されるグループの注意書きを編集できるようにします"
                v-model:isAllowed="editablePermissions.member.settings.note"/>
            <PermissionItem
                title="設定 / 教科を編集する"
                description="カードに設定する教科のメニュー内容を編集できるようにします"
                v-model:isAllowed="editablePermissions.member.settings.subjects"/>
            <PermissionItem
                title="設定 / 権限を編集する"
                description="メンバーの権限を編集できるようにします"
                v-model:isAllowed="editablePermissions.member.settings.permissions"/>
        </div>
    </ModalSection>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

import ModalSection from "../../modal/section.vue"
import PermissionItem from "./permissionSection/permissionItem.vue"

import { Permissions } from "../../../../models/groupSettings"

const props = defineProps<{ permissions: Partial<Permissions> }>()
const emit = defineEmits<{ (e: "update:permissions", newPermissions: Permissions): void }>()

function returnPerfectPermissions(){ return { ...Permissions.create(), ...props.permissions } }

const editablePermissions = ref(returnPerfectPermissions())
const changedByProp = ref(false)

watch(() => props.permissions, () => {
    changedByProp.value = true
    editablePermissions.value = returnPerfectPermissions()
})

watch(editablePermissions, (newPermissions: Permissions) => {
    if(!changedByProp.value){
        emit("update:permissions", newPermissions)
    }else{
        changedByProp.value = false
    }
}, { deep: true })
</script>