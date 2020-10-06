<template>
  <v-card max-width="800" class="mx-auto">
    <v-app-bar
      dark
      color="white"
      :src="require('@/assets/lista-de-tareas.jpg')"
    >
      <v-toolbar-title color="green" class="text-uppercase"
        >To Do List</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" dark @click="newTask" class="mx-2" fab color="green">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </template>
        <span>Nueva tarea</span>
      </v-tooltip>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card elevation="2" outlined shaped>
            <v-card-title class="headline"> {{ item.titulo }} </v-card-title>
            <v-card-text>{{ item.descripcion }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="borrar(item)">
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
              <v-btn color="orange" text @click="editar(item)">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" persistent width="600">
        <v-card>
          <v-toolbar
            flat
            dark
            color="pink"
            :src="require('@/assets/lista-de-tareas.jpg')"
            class="text-uppercase"
          >
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer />
            <div></div>
          </v-toolbar>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="form">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.titulo"
                      prepend-icon="edit"
                      label="Titulo "
                      clearable
                      :rules="[rules.required]"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea
                      v-model="editedItem.descripcion"
                      label="Descripción"
                      prepend-icon="edit"
                      clearable
                      :rules="[rules.required]"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" text @click="cerrar"> Cerrar </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    editedItem: {},
    id: null,
    rules: {
      required: (value) => !!value || "Este campo es requerido.",
    },
    title: "Nueva Tarea",
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding",
      },
    ],
  }),
  mounted() {
    this.getTareas();
  },
  methods: {
    newTask() {
      this.editedItem = {};
      this.title = "Nueva Tarea";
      this.dialog = true;
    },
    getTareas() {
      let _this = this;
      this.$axios
        .get("/tarea")
        .then((res) => {
          _this.items = res.data;
        })
        .catch((err) => {
          _this.$toast.error("Error al obtener tareas");
        });
    },
    save() {
      let _this = this;
      if (this.$refs.form.validate()) {
        let promise = null;
        if (this.id == null) {
          promise = this.$axios.post("/tarea", this.editedItem);
        } else {
          promise = this.$axios.put(
            `tarea/${this.id}`,
            this.editedItem
          );
        }
        return promise
          .then((res) => {
            _this.$toast.success("Tarea grabada.", {
              position: "top-center",
              duration: 2000,
            });
            _this.dialog = false;
            _this.getTareas();
          })
          .catch((err) => {
            this.$toast.error({
              text: "Error al grabar tarea: " + err.response.data.error,
              type: "error",
            });
          });
      }
    },
    borrar(item) {
      let _this = this;
      this.$axios
        .delete("/tarea/" + item._id)
        .then((res) => {
          _this.$toast.success("Tarea eliminada", {
            position: "top-center",
            duration: 2000,
          });
          _this.getTareas();
        })
        .catch((err) => {
          this.$toast.error({
            text: "Error al eliminar: ",
            type: "error",
          });
        });
    },
    editar(item) {
      debugger
      this.title = "Editar Tarea";
      this.id = item._id;
      this.editedItem.titulo = item.titulo;
      this.editedItem.descripcion = item.descripcion;
      this.dialog = true;
    },
    cerrar() {
      this.dialog = false;
      this.editedItem = {};
    },
  },
};
</script>