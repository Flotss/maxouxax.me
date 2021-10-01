<template>
  <div class="mejri">
      <div class="title">
		<h1>aAaAaaAaAaaaAAaaaAaaaa</h1>
	</div>
	<p>
		<q><i>If you are not on the web, you will have problems accessing services.</i></q>Tim Berners-Lee.
	</p>
	<p>
		<strong><i>HyperText Markup Language</i>(HTML)</strong>,
		ou <i>langage de balisage hypertexte</i>, est le
		langage au cœur de presque tout contenu Web.
		La majorité de ce que vous voyez dans votre navigateur est
		décrit en utilisant HTML.
		Plus précisément, HTML est le langage qui décrit la
		structure et la sémantique du contenu d'un document Web.
		Le contenu au sein d'un document Web est balisé par des
		éléments HTML.
	</p>
	<p>
		HTML est un standard international dont la spécification est
		maintenue par le <em>World Wide Web Consortium</em> et le
		WHATWG.
		Il est considéré comme un <q>standard vivant</q> et est
		techniquement toujours en évolution.
		La version toujours-à-jour de la spécification HTML est
		appelée <strong>HTML5</strong>.
	</p>
	<p>
		HTML5 <strong>ne</strong> décrit <strong>pas</strong> le
		style et la mise en forme du contenu, mais seulement le
		contenu lui-même et son <strong>sens</strong>. Le style et
		la mise en page sont définis et contrôlés par les
		<em>Cascading Style Sheets</em> (CSS).
	</p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

*{
    margin: 0px;
    padding: 0px;
    font-family: 'Cabin', sans-serif;
}
.mejri{
    background-image: url("https://c.tenor.com/wKAogI7UDyoAAAAd/mejri-mohammed.gif");
    animation: background 3s alternate infinite;
    background-repeat: repeat;
    background-position: 50% 50%;
    width: 100%;
    height: 100% !important;
}
.title{
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
}
h1{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    animation: title 1s alternate-reverse infinite;
}
h1::after, h1::before{
    content: '';
    position: relative;
    background-color: cyan;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    animation: animate 1.2s backwards infinite;
}
h1::after{
    left: 25px;
}
h1::before{
    right: 25px;
}
@keyframes animate{
    0%{
        transform: scale(1, 1);
        opacity: 1;
    }
    100%{
        transform: scale(5, 5);
        opacity: 0;
    }
}
@keyframes title{
    0%{
        transform: skew(20deg, 20deg);
    }
    100%{
        transform: skew(-20deg, -20deg);
    }
}
@keyframes background{
    0%{
        background-size: 200px 200px;
    }
    100%{
        background-size: 500px 2000px;
    }
}
</style>