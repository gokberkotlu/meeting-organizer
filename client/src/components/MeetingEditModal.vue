<template>
    <b-modal id="modal-edit-meeting" title="EDIT MEETING">
        <p class="my-4">Edit Existing Meeting Information</p>

        <b-form @submit.prevent="updateMeetingInformation()">
            <b-form-group id="input-group-meeting-subject-edit" label="Subject:" label-for="input-edit-meeting-subject-edit">
                <b-form-input id="input-edit-meeting-subject-edit" type="text" placeholder="Enter subject"
                v-model="meetingInfoEdit.subject"
                required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-meeting-date-edit" label="Date:"
                label-for="input-edit-meeting-date-edit">
                <b-form-datepicker id="input-edit-meeting-date-edit" type="date" placeholder="Enter date"
                v-model="meetingInfoEdit.date" required>
                </b-form-datepicker>
            </b-form-group>

            <b-form-group id="input-group-meeting-start-time-edit" label="Start time:"
                label-for="input-edit-meeting-start-time-edit">
                <b-form-timepicker id="input-edit-meeting-start-time-edit" type="date" placeholder="Enter start time"
                v-model="meetingInfoEdit.start_time" required>
                </b-form-timepicker>
            </b-form-group>

            <b-form-group id="input-group-meeting-end-time-edit" label="End time:"
                label-for="input-edit-meeting-end-time-edit">
                <b-form-timepicker id="input-edit-meeting-end-time-edit" type="date" placeholder="Enter end time"
                v-model="meetingInfoEdit.end_time" required>
                </b-form-timepicker>
            </b-form-group>

            <b-form-group id="input-group-meeting-participants-edit" label="Participants:" label-for="input-edit-meeting-participants-edit">
                <div class="participant-input-container">
                    <b-form-input
                    ref="participant-input-edit"
                    id="input-edit-meeting-participants-edit"
                    type="text"
                    placeholder="Enter a participant">
                    </b-form-input>
                    <i @click="addParticipant()" class="fas fa-plus-circle"></i>
                </div>
                <b-list-group v-if="meetingInfoEdit.participants">
                    <b-list-group-item
                    v-for="(participant, index) in meetingInfoEdit.participants"
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
    props: ['meetingInfoEdit'],
    data() {
        return {
            participants: null
        }
    },
    methods: {
        updateMeetingInformation() {
            if(
                this.meetingInfoEdit.subject !== '' &&
                this.meetingInfoEdit.date !== '' &&
                this.meetingInfoEdit.start_time !== '' &&
                this.meetingInfoEdit.end_time !== ''
            ) {
                var regex = new RegExp(':', 'g'),
                    timeStr1 = this.meetingInfoEdit.start_time,
                    timeStr2 = this.meetingInfoEdit.end_time;
                if(parseInt(timeStr1.replace(regex, ''), 10) < parseInt(timeStr2.replace(regex, ''), 10)) {
                    console.log(this.meetingInfoEdit);
                    axios({
                        method: 'put',
                        url: `${serverUrl}/update-meeting`,
                        data: {...this.meetingInfoEdit}
                    })
                    .then(res => {
                        if(res.status === 200) {
                            this.$emit('updated');
                            this.participants = [];
                            this.$refs["participant-input-edit"].$refs.input.value = '';
                            this.$bvToast.toast("Meeting is updated", {
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
            let newParticipant = this.$refs["participant-input-edit"].$refs.input.value;
            if(newParticipant !== '') {
                this.meetingInfoEdit.participants = [...this.meetingInfoEdit.participants, newParticipant ];
                this.$refs["participant-input-edit"].$refs.input.value = '';
            }
        },
        deleteParticipant(index) {
            this.meetingInfoEdit.participants.splice(index, 1);
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