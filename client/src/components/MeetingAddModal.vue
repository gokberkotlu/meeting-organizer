<template>
    <b-modal id="modal-add-meeting" title="NEW MEETING">
        <p class="my-4">Insert New Meeting Information</p>

        <b-form @submit.prevent="addMeetingInformation()">
            <b-form-group id="input-group-meeting-subject-edit" label="Subject:" label-for="input-edit-meeting-subject-edit">
                <b-form-input id="input-edit-meeting-subject-edit" type="text" placeholder="Enter subject"
                v-model="newMeetingData.subject"
                required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-meeting-date-edit" label="Date:"
                label-for="input-edit-meeting-date-edit">
                <b-form-datepicker id="input-edit-meeting-date-edit" type="date" placeholder="Enter date"
                v-model="newMeetingData.date" :min="minDate" required>
                </b-form-datepicker>
            </b-form-group>

            <b-form-group id="input-group-meeting-start-time-edit" label="Start time:"
                label-for="input-edit-meeting-start-time-edit">
                <b-form-timepicker id="input-edit-meeting-start-time-edit" type="date" placeholder="Enter start time"
                v-model="newMeetingData.start_time" required>
                </b-form-timepicker>
            </b-form-group>

            <b-form-group id="input-group-meeting-end-time-edit" label="End time:"
                label-for="input-edit-meeting-end-time-edit">
                <b-form-timepicker id="input-edit-meeting-end-time-edit" type="date" placeholder="Enter end time"
                v-model="newMeetingData.end_time" required>
                </b-form-timepicker>
            </b-form-group>

            <b-form-group id="input-group-meeting-participants-edit" label="participants:" label-for="input-edit-meeting-participants-edit">
                <div class="participant-input-container">
                    <b-form-input
                    ref="participant-input"
                    id="input-edit-meeting-participants-edit"
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
            axios({
                method: 'post',
                url: `${serverUrl}/add-meeting`,
                data: this.newMeetingData
            })
            .then(res => {
                if(res.status === 200) {
                    this.$emit('updated');
                    this.newMeetingData = {}
                }
            });
        },
        addParticipant() {
            let newParticipant = this.$refs["participant-input"].$refs.input.value;
            this.participants = [...this.participants, newParticipant ]
            console.log(this.participants);
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