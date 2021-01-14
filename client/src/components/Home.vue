<template>
  <div class="container">
    <div class="content">
      <h3>Hangi Gün Hangi Restorant Açık Yapay Zeka Size Söylesin</h3>
      <select name="day" id="day" v-model="selectedDay">
        <option value="1">Pazartesi</option>
        <option value="2">Salı</option>
        <option value="3">Çarşamba</option>
        <option value="4">Perşembe</option>
        <option value="5">Cuma</option>
        <option value="6">Cumartesi</option>
        <option value="0">Pazar</option>
      </select>
      <button class="tahmin" @click="tahminEt">Tahmin Et</button>
    </div>
    <div class="result" v-if="resultObject">
      <h2 v-for="name in names" :key="name.index">{{ name }}</h2>
      <p>açık Olması Gerek</p>
    </div>
  </div>
</template>

<script>
import API from "../services/API";
export default {
  data() {
    return {
      names: [],
      resultObject: undefined,
      selectedDay: "1",
    };
  },
  methods: {
    async tahminEt() {
      this.names = [];
      let res = await API().get(`/` + this.selectedDay);
      this.resultObject = res.data;
      for (let i in this.resultObject) {
        if (this.resultObject[i] > 0.48) {
          this.names.push(i);
        }
      }
    },
  },
};
</script>

<style scoped>
.result {
  color: rebeccapurple;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 50vh;
}
.content {
  text-align: center;
}
select {
  margin-top: 0.9rem;
  border: none;
  width: 250px;
  font-size: 1rem;
}
select:focus {
  outline: none;
}
option:focus {
  background-color: red;
}
.tahmin {
  margin: 1rem;
  margin-left: 1.5rem;
  padding: 0.8rem;
  border: none;
  background-color: rebeccapurple;
  color: #fff;
  border-radius: 8px;
}
.tahmin {
  outline: none;
}
</style>