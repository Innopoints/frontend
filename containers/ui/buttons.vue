<template>
  <Card>
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

      <Button
        :click="alert"
        label="outline disable"
        outline
        disabled
      />
    </div>
    <hr />

    <h1>Button-Links</h1>
    <div class="showcase">
      <Button
        link
        href="/"
        label="simple"
      />

      <Button
        link
        away
        href="http://example.com"
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
        round
        img="/images/icons/calendar.svg"
      />

      <Button
        round
        normal
        img="/images/icons/calendar.svg"
      />

      <Button
        round
        badge
        img="/images/icons/calendar.svg"
      />

      <Button
        round
        outline
        img="/images/icons/calendar.svg"
      />

      <Button
        round
        filled
        img="/images/icons/calendar.svg"
      />

      <Button
        round
        label="with label"
        img="/images/icons/calendar.svg"
      />

      <Button
        round
        filled
        label="with label"
        img="/images/icons/calendar.svg"
      />

      <Button
        round
        outline
        label="with label"
        img="/images/icons/calendar.svg"
      />
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import Button from '../../components/ui/button';
  export default {
    components: {
      Button,
      Card,
    },
    methods: {
      alert() {
        alert('Some text for the show');
      },
    },
  };
</script>
