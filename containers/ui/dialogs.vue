<template>
  <Card id="dialogs">
    <h1>Dialogs</h1>

    <div class="showcase">
      <!-- All using props -->
      <Dialog
        v-if="show1"
        :actions="[
          {text: 'cancel', onclick: doNothing},
          {text: 'action', onclick: doSomething, class: 'filled'},
        ]"
        @close="show1 = false"
        title="U got mail"
        text="Text of the dialog here text text."
      />
      <button v-else @click="show1 = true;" class="btn filled">Show</button>
    </div>
    <hr />

    <div class="showcase">
      <!-- All slots -->
      <Dialog v-if="show2" @close="show2 = false" danger>
        <template v-slot:title>
          <h3>Title with custom HTML</h3>
        </template>
        Something bad is about to happen.<br />You just gonna let it roll?
        <template v-slot:actions>
          <button class="btn">no, wait</button>
          <button class="btn filled danger">yeah lmao</button>
        </template>
      </Dialog>
      <button v-else @click="show2 = true;" class="btn filled">Show</button>
    </div>
    <hr />

    <div class="showcase">
      <!-- Combination -->
      <Dialog
        v-if="show3"
        :actions="[
          {text: 'wait, what?'},
        ]"
        @close="show3 = false"
        notice
      >
        <span>What's it gonna take for you to ever let go?</span>
      </Dialog>
      <button v-else @click="show3 = true;" class="btn filled">Show</button>
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import Dialog from '../../components/ui/dialog';

  export default {
    components: {
      Card,
      Dialog,
    },
    data() {
      return {
        show1: true,
        show2: true,
        show3: true,
      };
    },
    methods: {
      doNothing() {

      },
      doSomething() {
        alert('Taking action!');
      },
    },
  };
</script>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}
</style>
