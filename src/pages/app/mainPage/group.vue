<template>
  {{ settings }}
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useGroupSettings } from '../../../hooks/useSettings';

const url = new URL(window.location.href)
const params = url.searchParams
const group_id = ((new_group_id) => {
  if(new_group_id){
    return new_group_id
  }else{
    throw new Error("group_idがnullだよ！！")
  }
})(params.get("group"))

const { settings } = useGroupSettings(group_id)

onBeforeMount(()=>{
  console.log(settings);
})

function addCard(){/* カードを追加する制御の実行 */}

defineExpose({ addCard })
</script>