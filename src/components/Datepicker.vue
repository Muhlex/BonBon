<template>
  <div class="datepicker component">
    <!-- Calendar - Select Date-Range -->
    <div class="date-range range-select">
      <ul class="select-list">
        <li class="select-item">
          <RadioButton
            v-model="selectionMode"
            name="range"
            value="single"
            class="radio"
            @click="setSelectionMode('single', $event)"
          />
          <p>Single</p>
        </li>
        <li class="select-item">
          <RadioButton
            v-model="selectionMode"
            name="range"
            value="range"
            class="radio"
            @click="setSelectionMode('range', $event)"
          />
          <p>Range</p>
        </li>
      </ul>
    </div>

    <!-- Calendar - Date-Picker -->
    <div class="calendar-container">
      <Calendar
        ref="calendar"
        v-model="date"
        :inline="true"
        :selection-mode="selectionMode"
        class="calendar"
        @date-select="setSelection($event)"
      /> 
    </div>
    <div class="submit-container">
      <Button 
        class="submit-button"
        @click="submitSelection"
      >
        Submit Selection
      </Button>
    </div>
  </div>
</template>

<script>
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';

export default {
  name: 'Datepicker',
  components: {
    Calendar,
    Button,
    RadioButton,
  },
  data() {
    return {
      date: null,
      selectionMode: 'single',
      selecttion: [],
    };
  },
  mounted() {
    console.log(this.$refs.calendar);
  },
  methods: {
    setSelectionMode(modeState, event) {
      this.$refs.calendar.onClearButtonClick(event);
      this.selectionMode = modeState;
    },
    setSelection(output) {
      //convert Output
      // let output = outputString.split(' ');
      console.log({output});

      switch(this.selectionMode) {
        case 'single': 
          break;
        case 'range':
          break;
      }
    },
    getSelection(event) {
    },
    submitSelection(event) {
      console.log('submit', event);
    },
  },
};
</script>

<style lang="scss" scoped>
.date-range {
  .select-list {
    display: flex;
    justify-content: center;
    margin:0;
    padding: 0;
    list-style-type: none;
  }

  .select-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;
  }

  .radio {
    margin-right: 8px;
  }
}

.calendar-container {
  display: flex;
  justify-content: center;
}

.submit-container {
  display: flex;
  justify-content: center;
  padding: 8px;
}
</style>


