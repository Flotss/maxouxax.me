<template>
	<div class="e404">
		<div class="error-container">
			<h1>Oups!</h1>
			<h2>Page introuvable</h2>
			<h5>Vous étiez tellement déterminé en venant ici que venez d'effrayer la page que vous cherchiez !</h5>
		</div>
		<div class="buttons">
			<router-link to="/">
				<v-btn x-large color="blue" dark>
					<v-icon left>
						mdi-heart-broken
					</v-icon>
					Retourner à l'accueil
				</v-btn>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: '404',

	}
</script>

<style scoped>
.e404{
	width: 100%;
	min-height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.error-container{
	text-align: center;
}
.buttons{
	margin: 35px;
	display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
}
@media screen and (min-width: 800px){
	.buttons{
		flex-direction: row;
	}
}
.buttons a{
	margin: 5px;
}
.error-container{
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	flex-direction: column;
}
.error-container h1{
	font-size: 5rem;
	font-weight: 900;
}
.error-container h2{
	font-size: 2.5rem;
	font-weight: 400;
}
.error-container h5{
	font-size: 1rem;
	font-weight: 200;
	max-width: 300px;
	color: grey;
}
</style>