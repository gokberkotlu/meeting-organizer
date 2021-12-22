<template>
    <b-modal id="modal-add-meeting" title="NEW MEETING">
        <p class="my-4">Insert New Meeting Information</p>

        <b-form @submit.prevent="addMeetingInformation()">
            <b-form-group id="input-group-meeting-subject-add" label="Subject:" label-for="input-add-meeting-subject-add">
                <b-form-input id="input-add-meeting-subject-add" type="text" placeholder="Enter subject"
                v-model="newMeetingData.subject"
                required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-meeting-date-add" label="Date:"
                label-for="input-add-meeting-date-add">
                <b-form-datepicker id="input-add-meeting-date-add" type="date" placeholder="Enter date"
                v-model="newMeetingData.date" :min="minDate" required>
                </b-form-datepicker>
            </b-form-group>

            <b-form-group id="input-group-meeting-start-time-add" label="Start time:"
                label-for="input-add-meeting-start-time-add">
                <b-form-timepicker id="input-add-meeting-start-time-add" type="date" placeholder="Enter start time"
                v-model="newMeetingData.start_time" required>
                </b-form-timepicker>
            </b-form-group>

            <b-form-group id="input-group-meeting-end-time-add" label="End time:"
                label-for="input-add-meeting-end-time-add">
                <b-form-timepicker id="input-add-meeting-end-time-add" type="date" placeholder="Enter end time"
                v-model="newMeetingData.end_time" required>
                </b-form-timepicker>
            </b-form-group>

            <b-form-group id="input-group-meeting-participants-add" label="Participants:" label-for="input-add-meeting-participants-add">
                <div class="participant-input-container">
                    <b-form-input
                    ref="participant-input-add"
                    id="input-add-meeting-participants-add"
                    type="text"
                    placeholder="Enter a participant">
                    </b-form-input>
                    <i @click="addParticipant()" class="fas fa-plus-circle"></i>
                </div>
                <b-list-group>
                    <b-list-group-item
                    v-for="(participant, index) in participants"
                    :key="`participant-${index}`">
                        {{ participant }}
                        <i class="fas fa-trash-alt" @click="deleteParticipant(index)"></i>
                    </b-list-group-item>
                </b-list-group>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
</template>

<script>
import axios from 'axios'
import { serverUrl } from '../utils/serverUrl'
export default {
    data() {
        return {
            newMeetingData : {},
            participants: [],
            minDate: new Date()
        }
    },
    methods: {
        addMeetingInformation() {
            if(
                this.newMeetingData.subject !== '' &&
                this.newMeetingData.date !== '' &&
                this.newMeetingData.start_time !== '' &&
                this.newMeetingData.end_time !== ''
            ) {
                var regex = new RegExp(':', 'g'),
                    timeStr1 = this.newMeetingData.start_time,
                    timeStr2 = this.newMeetingData.end_time;
                if(parseInt(timeStr1.replace(regex, ''), 10) < parseInt(timeStr2.replace(regex, ''), 10)) {
                    axios({
                        method: 'post',
                        url: `${serverUrl}/add-meeting`,
                        data: {...this.newMeetingData, participants: this.participants}
                    })
                    .then(res => {
                        if(res.status === 200) {
                            this.$emit('updated');
                            this.newMeetingData = {};
                            this.participants = [];
                            this.$refs["participant-input-add"].$refs.input.value = '';
                            this.$bvToast.toast("New meeting is added", {
                                title: 'Success',
                                autoHideDelay: 3000
                            })
                        }
                    });
                } else {
                    this.$bvToast.toast("Meeting end time can not be before start time", {
                        title: 'Fail',
                        autoHideDelay: 3000
                    })
                }
            }
        },
        addParticipant() {
            let newParticipant = this.$refs["participant-input-add"].$refs.input.value;
            if(newParticipant !== '') {
                this.participants = [...this.participants, newParticipant ];
                this.$refs["participant-input-add"].$refs.input.value = '';
            }
        },
        deleteParticipant(index) {
            this.participants.splice(index, 1);
        }
    }
}
</script>

<style scoped>
    .participant-input-container {
        position: relative;
    }

    .fa-plus-circle {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
    }
</style>