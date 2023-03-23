<template>
	<h2 class="text-xl"><slot name="title"/></h2>
	<p><slot name="description"/></p>
	<slot name="warning"/>
	<div class="bg-gray-100 p-4 rounded-md">
		<slot name="main"/>
	</div>
</template>