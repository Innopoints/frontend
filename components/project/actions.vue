<template>
  <div class="actions padded">
    <Button
      img="/images/icons/edit.svg"
      label="edit"
      outline
    />
    <Button
      img="/images/icons/trash-2.svg"
      label="delete"
      outline
      danger
    />
    <Button
      img="/images/icons/check-circle.svg"
      label="mark as finished"
      filled
    />
    <Button
      img="/images/icons/upload.svg"
      label="send for review"
      filled
    />
  </div>
</template>

<script>
  import Button from '@/components/ui/button';

  export default {
    name: 'ProjActions',
    components: { Button },
  };
</script>
