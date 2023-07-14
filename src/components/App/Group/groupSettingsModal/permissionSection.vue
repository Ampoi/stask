<template>
    <ModalSection class="flex flex-col gap-4">
        <h3 class="text-2xl font-semibold">メンバーの権限</h3>
        <div class="flex flex-col gap-2">
            <PermissionItem
                title="カードを編集する"
                description="共有されているカードの名前やページなどを編集できるようにします"
                v-model:isAllowed="permissions.member.card"/>
            <PermissionItem
                title="メンバーを管理する"
                description="グループ内のメンバーのロールを管理したりメンバーをグループからキックできるようにします"
                v-model:isAllowed="permissions.member.members"/>
            <PermissionItem
                title="設定 / 教科を編集する"
                description="カードに設定する教科のメニュー内容を編集できるようにします"
                v-model:isAllowed="permissions.member.settings.subjects"/>
            <PermissionItem
                title="設定 / 権限を編集する"
                description="メンバーの権限を編集できるようにします"
                v-model:isAllowed="permissions.member.settings.permissions"/>
        </div>
    </ModalSection>
</template>
<script setup lang="ts">
import ModalSection from "../../modal/section.vue"
import PermissionItem from "./permissionSection/permissionItem.vue"

import { Permissions } from "../../../../models/GroupSettings"

const props = defineProps<{
    permissions: Permissions
}>()
</script>