<script>
  import Button from 'ui/button.svelte';
  import RadioGroup from 'ui/radio-group.svelte';

  const items = [
    {
      id: 1,
      label: 'Push',
      checked: false,
    },
    {
      id: 2,
      label: 'Off',
      checked: false,
    },
    {
      id: 3,
      label: 'e-mail',
      checked: false,
    },
  ];

  const selected = {
    all: {},
    store: {},
    volunteering: {},
    projs: {},
  };

  const changeAll = (e) => {
    const item = e.detail;
    item.checked = true;

    selected.all = item;
    selected.store = item;
    selected.volunteering = item;
    selected.projs = item;
  };

  const changeOne = (name, e) => {
    const item = e.detail;
    item.checked = true;

    selected[name] = item;
  };
</script>

<div class="notifications">
  <header>
    <div class="dialog notice">
      <div class="message">
        <svg src="images/icons/alert-triangle.svg" class="icon" />
        <p>Push notifications require permission before they can be used.</p>
      </div>
      <div class="actions">
        <Button>prompt for permissions</Button>
      </div>
    </div>
  </header>

  <ul>
    <li class="section">
      <header>
        <div class="title">
          All notifications
        </div>
      </header>
      <RadioGroup
          classname="switches"
          name="all"
          labelPosition="left"
          isLabel
          isLabelGreen
          items={items}
          selected={selected.all}
          on:change={changeAll}
      />
    </li>
    <li class="section">
      <header>
        <div class="title">InnoStore notifications</div>
        <div class="subtitle">Purchase ready for pickup, new arrivals in the InnoStore</div>
      </header>
      <RadioGroup
          classname="switches"
          name="store"
          labelPosition="left"
          isLabel
          isLabelGreen
          items={items}
          selected={selected.store}
          on:change="{(e) => changeOne('store', e)}"
      />
    </li>
    <li class="section">
      <header>
        <div class="title">Volunteering notifications</div>
        <div class="subtitle">Application accepted/rejected, new reward to claim</div>
      </header>
      <RadioGroup
          classname="switches"
          name="volunteering"
          labelPosition="left"
          isLabel
          isLabelGreen
          items={items}
          selected={selected.volunteering}
          on:change="{(e) => changeOne('volunteering', e)}"
      />
    </li>
    <li class="section">
      <header>
        <div class="title">Project creation</div>
        <div class="subtitle">Project failed the final review</div>
      </header>
      <RadioGroup
          classname="switches"
          name="projs"
          labelPosition="left"
          isLabel
          isLabelGreen
          items={items}
          selected={selected.projs}
          on:change="{(e) => changeOne('projs', e)}"
      />
    </li>
  </ul>
</div>
