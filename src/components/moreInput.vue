<template>
  <div
    contenteditable
    @keypress="checkInput"
    @input="updateData"
    v-text="textData"
    :class="{'w-full': (textData.length == 0)}"
    class=" max-w-[200px]"
  />
  <p v-if="textData.length == 0" class="-mt-8 pointer-events-none text-black/30">{{placeholder}}</p>
</template>
<script>
export default {
  props:["textData", "placeholder"],
  emits:["update:textData"],
  methods: {
    checkInput(e){
      if(e.key == "Enter"){
        console.log("prevent!");
        return e.preventDefault()
      }
    },
    updateData(e){
      this.$emit("update:textData", e.target.innerText)
    }
  }
}
</script>