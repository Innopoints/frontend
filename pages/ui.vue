<template>
  <div class="body-wrap">
    <card>
      <h1>Buttons</h1>
      <div class="showcase">
        <Button
          :click="alert"
          label="simple"
        />

        <Button
          :click="alert"
          label="danger"
          danger
        />

        <Button
          :click="alert"
          label="filled"
          filled
        />

        <Button
          :click="alert"
          label="outline"
          outline
        />
        <Button
          :click="alert"
          label="filled danger"
          filled
          danger
        />

        <Button
          :click="alert"
          label="outline danger"
          outline
          danger
        />
      </div>
      <hr />

      <h1>Button-Links</h1>
      <div class="showcase">
        <Button
          link
          href="#"
          label="simple"
        />

        <Button
          link
          href="#"
          label="danger"
          danger
        />

        <Button
          link
          href="#"
          label="filled"
          filled
        />

        <Button
          link
          href="#"
          label="outline"
          outline
        />

        <Button
          link
          href="#"
          label="filled danger"
          filled
          danger
        />

        <Button
          link
          href="#"
          label="filled danger"
          outline
          danger
        />
      </div>
      <hr />

      <h1>With icons</h1>
      <div class="showcase">
        <Button
          img="/images/events/calendar.svg"
        />

        <Button
          round
          img="/images/events/calendar.svg"
        />

        <Button
          round
          badge
          img="/images/events/calendar.svg"
        />

        <Button
          round
          normal
          img="/images/events/calendar.svg"
        />

        <Button
          round
          normal
          badge
          img="/images/events/calendar.svg"
        />

        <Button
          round
          danger
          outline
          img="/images/events/calendar.svg"
        />

        <Button
          round
          danger
          filled
          badge
          img="/images/events/calendar.svg"
        />

        <Button
          outline
          img="/images/events/calendar.svg"
        />

        <Button
          round
          outline
          img="/images/events/calendar.svg"
        />

        <Button
          round
          filled
          img="/images/events/calendar.svg"
        />

        <Button
          round
          outline
          normal
          badge
          img="/images/events/calendar.svg"
        />

        <Button
          round
          label="with label"
          img="/images/events/calendar.svg"
        />

        <Button
          round
          filled
          label="with label"
          img="/images/events/calendar.svg"
        />

        <Button
          round
          outline
          label="with label"
          img="/images/events/calendar.svg"
        />

        <Button
          outline
          danger
          label="with label"
          img="/images/events/calendar.svg"
        />

        <Button
          filled
          danger
          label="with label"
          img="/images/events/calendar.svg"
        />
      </div>
    </card>
  </div>
</template>

<script>
  import Card from '../components/ui/card';
  import Button from '../components/ui/button';

  export default {
    components: {
      Button,
      Card
    },
    head: {
      title: 'UI kit',
      meta: [
        { hid: 'description', name: 'description', content: `UI kit for innopoints project` }
      ]
    },
    methods: {
      alert() {
        alert('Some text for the show');
      }
    }
  };
</script>

<style src="../static/css/ui-page.css" />
