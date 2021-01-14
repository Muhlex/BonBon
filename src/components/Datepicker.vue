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
    <div
      v-if="showSubmit"
      class="submit-container"
    >
      <Button 
        class="submit-button"
        @click="submitSelection"
      >
        Apply Filter
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
  props: {
    showSubmit: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'submit',
  ],
  data() {
    return {
      date: null,
      selectionMode: 'single',
      selection: [],
    };
  },
  methods: {
    setSelectionMode(modeState, event) {
      this.$refs.calendar.onClearButtonClick(event);
      this.selectionMode = modeState;
    },
    setSelection(date) {
      switch(this.selectionMode) {
        case 'single':
          this.selection[0] = date;
          break;
        case 'range':
          if(this.selection.length === 1) date.setHours(23, 59, 59, 999);
          if(this.selection.length === 2) this.selection = [];
          this.selection.push(date);
          break;
      }
    },
    submitSelection(event) {
      this.$emit('submit', this.selection);
      this.$refs.calendar.onClearButtonClick(event);
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


