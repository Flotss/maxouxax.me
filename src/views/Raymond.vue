<template>
  <div class="raymond mt-12 mx-xl-12 mx-lg-8 mx-md-8 mx-sm-4 mx-0">
    <div class="loading d-flex justify-center" v-if="loading">
      <v-sheet width="374px" class="mx-5 my-4">
        <v-skeleton-loader width="100%" type="card"></v-skeleton-loader>
      </v-sheet>
    </div>
    <div class="invalid" v-if="!valid">
      <v-alert
        border="left"
        icon="mdi-alert-circle"
        transition="slide-y-transition"
        elevation="4"
        type="error"
        max-width="620px"
      >
        Une erreur est survenue lors du chargement des informations. Veuillez
        vérifier votre connexion Internet ou l'email fournie.
      </v-alert>
    </div>
    <div class="contact ma-4" v-if="!loading && valid">
      <div class="contact-info d-flex justify-center">
        <v-card flat color="transparent" class="mb-10">
          <div class="profile d-flex align-content-center align-center">
            <v-avatar class="profile" size="128">
              <v-img :src="teacher.image"></v-img>
            </v-avatar>
            <div class="identity d-flex justify-center flex-column">
              <v-card-title class="text-h3 py-0 font-weight-bold">{{
                teacher.displayName
              }}</v-card-title>
              <v-card-text class="text-h5 py-0 text--secondary">{{
                teacher.bcShortLabel
              }}</v-card-text>
            </div>
          </div>
        </v-card>
      </div>
      <div
        class="
          contact-buttons
          d-flex
          justify-center
          align-center align-content-center
          flex-column
          mt-16
        "
      >
        <p class="text-h4 font-weight-bold">
          Quelle messagerie souhaitez-vous utiliser pour contacter
          {{ teacher.displayName }} ?
        </p>
        <v-divider class="mx-16"></v-divider>
        <div class="options full-width d-flex justify-center flex-wrap">
          <v-card
            v-ripple
            class="mx-5 my-4 card"
            :width="$vuetify.breakpoint.name === 'xs' ? '80vw' : '374px'"
            max-width="374px"
            min-height="120"
            elevation="2"
            outlined
            v-for="option in options"
            :key="option.id"
            :href="option.getUrl(email)"
            :loading="option.loading"
            @click="option.onClick()"
            raised
          >
            <v-card-title>
              <v-icon left>{{ option.icon }}</v-icon> {{ option.name }}
            </v-card-title>
            <v-card-subtitle>{{ option.description }}</v-card-subtitle>
          </v-card>

          <v-snackbar elevation="12" v-model="copied" timeout="3000">
            Adresse email copiée !
            <template v-slot:action="{ attrs }">
              <v-btn color="info" text v-bind="attrs" @click="copied = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const emailPattern = new RegExp("(.*)(@univ-lorraine.fr)$");

export default {
  name: "Raymond",
  data() {
    return {
      teacher: {},
      copied: false,
      email: "",
      loading: true,
      valid: true,
      options: [
        {
          id: "univ-mail",
          name: "Messagerie universitaire",
          description: "Utiliser la messagerie de l'Université de Lorraine",
          icon: "mdi-email",
          loading: false,
          getUrl(email) {
            return (
              "https://mail.etu.univ-lorraine.fr/zimbra/mail?view=compose&to=" +
              email
            );
          },
          onClick() {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
            }, 5000);
          },
        },
        {
          id: "default-mail",
          name: "Messagerie par défaut",
          description: "Utiliser la messagerie par défaut de votre appareil",
          icon: "mdi-email",
          loading: false,
          getUrl(email) {
            return "mailto:" + email;
          },
          onClick() {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
            }, 5000);
          },
        },
        {
          id: "copy-mail",
          name: "Copier l'adresse email",
          description: "Copier l'adresse email de l'enseignant",
          icon: "mdi-clipboard-text",
          loading: false,
          getUrl(email) {
            return null;
          },
          onClick() {
            navigator.clipboard.writeText(this.email);
            copied = true;
          },
        },
      ],
    };
  },
  async mounted() {
    this.email = this.$route.params.email;
    if (this.email.match(emailPattern)) {
      let id = this.email.match(emailPattern)[1].split(".").join(" ");
      this.teacher = await fetch("/api/raymond/get-info?search=" + id)
        .then((response) => response.json())
        .catch(() => {
          this.valid = false;
        });
      if (this.teacher != null && this.teacher.mail != null) {
        this.email = this.decryptEmail(this.teacher.mail);
      }
    } else {
      this.valid = false;
    }
    this.loading = false;
  },
  methods: {
    decryptEmail(email) {
      var n = 0;
      var r = "";
      for (var i = 0; i < email.length; i++) {
        n = email.charCodeAt(i);
        if (n >= 8364) {
          n = 128;
        }
        r += String.fromCharCode(n - 1);
      }
      return r;
    },
  },
};
</script>

<style scoped>
.raymond {
  height: 100%;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .profile {
    flex-direction: column;
    text-align: center;
  } 
}
</style>